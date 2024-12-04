export const MdxSpacer = ({ size }: { size: number }) => {
  // eslint-disable-next-line react/forbid-dom-props
  return <div style={{ marginTop: `${size ?? "4"}px` }} />;
};
