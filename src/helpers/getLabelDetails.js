import { useQuery } from "@tanstack/react-query";


export function getLabelDetails() {
 
  const labelsData = useQuery({
    queryKey: ["labels"],
    queryFn:  () => (
          fetch('api/labels').then((res) =>res.json()
          )
        )

  });
  console.log('getLabelDetails',labelsData);
  return labelsData;
  
}
