import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={358}
    height={471}
    viewBox="0 0 358 471"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="16" ry="16" width="358" height="471" />
  </ContentLoader>
);
