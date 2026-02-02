const App = () => {
  return (
    <>
      {/* ❌ TEMP COMMENT NAVBAR */}
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
      </Routes>
    </>
  );
};
