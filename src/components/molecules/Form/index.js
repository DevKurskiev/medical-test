import React, { useState } from "react";
import { Box, Typography, Field, Button } from "../../atoms";
import "./styles.scss";

const genderOptions = [
  { value: "Мужской", label: "Мужской" },
  { value: "Женский", label: "Женский" },
];

const educationOptions = [
  { value: "МГУ", label: "МГУ" },
  { value: "ИНГгУ", label: "ИНГгУ" },
];

function Form({ onClick }) {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    responsibilities: "",
    work: "",
    education: "",
    graduation: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const validateForm = () => {
    const newErrors = Object.fromEntries(
      Object.entries(formData)
        .filter(([fieldName, value]) => !value)
        .map(([fieldName]) => [fieldName, "Обязательное поле"])
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await fetch("https://randomuser.me/api");
        const data = await response.json();
        const { results } = data;
        const apiFullName = `${results[0].name.first} ${results[0].name.last}`;
        const [firstName, lastName] = formData.fullName.split(" ");
        const fullName = [firstName, lastName].join(" ");
        console.log(fullName === apiFullName, fullName, apiFullName);
        if (fullName === apiFullName) {
          alert("Пользователь уже зарегистрирован");
        } else {
          console.log("Данные", formData);
          alert("Пользователь успешно зарегистрирован");
        }
      } catch (error) {
        console.error("Ошибка при обращении к API:", error);
      }
    } else {
      console.log(
        "Форма содержит ошибки. Пожалуйста, заполните все обязательные поля."
      );
    }
  };

  return (
    <Box as="div" className="container">
      <Typography variant="h1">Регистрация</Typography>

      <Box as="div" className="about">
        <Typography variant="h2">О себе</Typography>

        <Box as="div">
          <Field
            label="ФИО"
            error={errors.fullName}
            showError={!!errors.fullName}
            onChange={handleChange}
            fieldName="fullName"
            placeholder="Введите ФИО"
            value={formData.fullName}
            isRequired
          />

          <Box as="div" className="about-fields">
            <Field
              label="Пол"
              error={errors.gender}
              showError={!!errors.gender}
              options={genderOptions}
              onChange={handleChange}
              fieldName="gender"
              placeholder="Выберите пол"
              value={formData.gender}
              isRequired
            />

            <Field
              label="Дата рождения"
              error={errors.birthdate}
              showError={!!errors.birthdate}
              onChange={handleChange}
              fieldName="birthdate"
              placeholder="Дата рождения"
              value={formData.birthdate}
              isRequired
              isDateField
            />
          </Box>
        </Box>
      </Box>

      <Box as="div" className="education">
        <Typography variant="h2">Образование</Typography>

        <Box as="div" className="about-fields">
          <Field
            label="ВУЗ"
            error={errors.education}
            showError={!!errors.education}
            onChange={handleChange}
            fieldName="education"
            options={educationOptions}
            placeholder="Выберите ВУЗ"
            value={formData.education}
            isRequired
          />
          <Field
            label="Год окончанияя"
            error={errors.graduation}
            showError={!!errors.graduation}
            onChange={handleChange}
            fieldName="graduation"
            placeholder="Год окончания"
            value={formData.graduation}
            isRequired
            isDateField
          />
        </Box>
      </Box>

      <Box as="div" className="work">
        <Typography variant="h2">Работа</Typography>

        <Box as="div">
          <Field
            label="Место работы"
            error={errors.work}
            showError={!!errors.work}
            onChange={handleChange}
            fieldName="work"
            placeholder="Место работы"
            value={formData.work}
            isRequired
          />
          <Field
            label="Должностные обязанности"
            error={errors.responsibilities}
            showError={!!errors.responsibilities}
            onChange={handleChange}
            fieldName="responsibilities"
            placeholder="Должностные обязанности"
            value={formData.responsibilities}
            isRequired
          />
        </Box>
      </Box>

      <Button text="Сохранить" onClick={onClick || handleSubmit} />
    </Box>
  );
}

export default Form;
