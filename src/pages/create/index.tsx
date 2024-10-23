import Input from "./atoms/button";

const CreatePage = () => {
  return (
    <>
      <div>
        <form>
          <Input />
          <input type="text" placeholder="id" required />
          <input type="password" placeholder="password" required />
          <input type="number" placeholder="your phone number" required />
          <button type="button"></button>
        </form>
      </div>
      ;
    </>
  );
};

export default CreatePage;
