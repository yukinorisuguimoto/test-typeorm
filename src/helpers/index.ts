
export const parseOrderBy = (val) => {
  const t = val!.orderBy;
  if (t) {
    const tt = t.split("_");
    return { [tt[0]]: tt[1] };
  }
  return {};
}

export const parsePaginate = (val) => {
  const t = val!.paginate || {};
  return {
    skip: t!.skip,
    take: t!.take,
  }
}