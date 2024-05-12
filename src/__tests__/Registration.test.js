/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from "@testing-library/react";
import { Form } from "../components/molecules";

describe("Registration", () => {
  it("Проверка сохраненияя пользователя", async () => {
    const mockHandleClick = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form onClick={mockHandleClick} />
    );

    const fullName = getByText("ФИО").nextSibling;
    const gender = getByText("Пол").nextSibling;
    const birthdate = getByPlaceholderText("Дата рождения");
    const education = getByText("ВУЗ").nextSibling;
    const graduation = getByPlaceholderText("Год окончания");
    const work = getByText("Место работы").nextSibling;
    const responsibilities = getByText("Должностные обязанности").nextSibling;

    fireEvent.change(fullName, { target: { value: "John Doe" } });
    fireEvent.change(gender, { target: { value: "Мужской" } });
    fireEvent.change(birthdate, { target: { value: "1990-01-01" } });
    fireEvent.change(education, { target: { value: "МГУ" } });
    fireEvent.change(graduation, { target: { value: "2011-02-02" } });
    fireEvent.change(work, { target: { value: "Google" } });
    fireEvent.change(responsibilities, { target: { value: "Frontend" } });

    const saveButton = getByText("Сохранить");
    fireEvent.click(saveButton);

    expect(mockHandleClick).toHaveBeenCalled();
  });
});
