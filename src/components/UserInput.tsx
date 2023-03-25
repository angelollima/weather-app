import { FormEventHandler, useState } from "react";

interface UserInputProps {
  value: any;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: FormEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
};

const UserInput = ({value, onSubmit, onChange, children}: UserInputProps) => {

  return (
    <main className="flex flex-col justify-center items-center">
      <section>
        <form id="form" onSubmit={onSubmit}>
          <input
            className="input"
            name="location"
            value={value}
            onChange={onChange}
            placeholder="Enter"
            type="text"
          />
          {children}
        </form>
      </section>
    </main>
  );
};

export default UserInput;
