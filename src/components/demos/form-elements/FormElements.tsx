import s from './FormElements.module.scss';

export const FormElements = () => {
  const inputs = ['date', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week'];

  return (
    <div className={s.formElements}>

      <div>
        <label htmlFor={`${s.formElement}-select`}>select</label>
        <select id={`${s.formElement}-select`}>
          <option value="">--Please choose an option--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
      </div>
      {inputs.map(input => (
        <div key={input}>
          <label key={input} htmlFor={`${s.formElement}-${input}`}>{input}</label>
          <input id={`${s.formElement}-${input}`} type={input} />
        </div>
      ))}
    </div>
  );
}