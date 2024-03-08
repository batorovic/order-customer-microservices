import { PaginationType, SORT_ORDER } from '@batuhan_kutluay-case/common';
import { FilterQuery, PipelineStage, Types } from 'mongoose';

export const DEFAULT_SORT_FIELD = {
  createdAt: -1,
} as Record<string, SORT_ORDER>;

export function generateProjectionFields(fields: string): Record<string, number> {
  const fieldsArray = fields.split(' ');
  return fieldsArray.reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {});
}

export function convertObjectIds(stringsArray: string[]) {
  return [...new Set(stringsArray)].map((d) => new Types.ObjectId(d));
}

export const getDefaultFilterFacet = (skip?: number, limit?: number, project?: Record<string, number>) =>
  ({
    count: [{ $count: 'count' }],
    data: [
      { $skip: skip || 0 },
      { $limit: limit || Number.MAX_SAFE_INTEGER },
      {
        $project: project,
      },
    ],
  }) as PipelineStage.Facet['$facet'];

export const createPipeline = <T>(
  filterQuery: FilterQuery<T>,
  pagination?: PaginationType,
  lookup?: PipelineStage.Lookup,
  unwind?: PipelineStage.Unwind,
  fields?: string,
): PipelineStage[] => {
  const pipeline: PipelineStage[] = [
    { $match: filterQuery },
    pagination?.sort && pagination?.sortBy
      ? { $sort: { [pagination?.sortBy]: pagination?.sort } }
      : { $sort: { _id: -1 } },
  ];

  if (lookup) pipeline.push(lookup);
  if (unwind) pipeline.push(unwind);

  pipeline.push(
    {
      $facet: {
        data: [
          { $skip: pagination?.skip || 0 },
          { $limit: pagination?.limit || Number.MAX_SAFE_INTEGER },
          ...(fields ? [{ $project: generateProjectionFields(fields) }] : []),
        ],
        count: [{ $count: 'count' }],
      },
    },
    {
      $project: {
        data: 1,
        count: { $arrayElemAt: ['$count.count', 0] },
      },
    },
  );

  return pipeline;
};
