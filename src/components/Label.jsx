import { getLabelDetails } from "@/helpers/getLabelDetails";

export function Label({label}) {
  const labelsQuery = getLabelDetails();
  if (labelsQuery.isPending) return null;
  const labelObj = labelsQuery.data.find(
    (queryLabel) => queryLabel.id === label
  );
  if (!labelObj) return null;
  return <span className={`label ${labelObj.color}`}>{labelObj.name}</span>;
}
