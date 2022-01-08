const UserPage = (props) => {
  return <h1>{props.username}</h1>;
};

export async function getServerSideProps(context) {
  const { params, req, res } = context; // req and res server side code


  return {
    props: {
      username: "Livia",
    },
  };
}

export default UserPage;
