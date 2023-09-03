import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const RecipeCardSkeleton = () => {
  return (
    <Card width="250px" borderRadius={10}>
      <CardBody>
        <Skeleton width="100%" height="250px" borderRadius="lg" />
        <SkeletonText
          noOfLines={1}
          skeletonHeight={6}
          marginTop={5}
          width="150px"
        />
      </CardBody>
    </Card>
  );
};

export default RecipeCardSkeleton;
