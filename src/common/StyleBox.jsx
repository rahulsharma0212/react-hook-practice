const StyleBox = ({ heading, children }) => {
  return (
    <>
      <h2>{heading}</h2>
      <div style={{ paddingLeft: "10px" }}>
        {children}
        <br />
        <br />
      </div>
    </>
  );
};
export default StyleBox;
