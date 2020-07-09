// global components
import { H1, H2 } from 'components/heading/Heading';
import { Meta } from 'components/meta/Meta';
import { Section } from 'components/section/Section';

export default function Elements() {

  const inputTypes = [
    { type: 'button', value: 'button' },
    { type: 'checkbox' },
    { type: 'color' },
    { type: 'date' },
    { type: 'datetime-local' },
    { type: 'email' },
    { type: 'month' },
    { type: 'number' },
    { type: 'password' },
    { type: 'radio' },
    { type: 'search', value: 'search' },
    { type: 'tel', value: '00354' },
    { type: 'text', value: 'text' },
    { type: 'text', value: 'disabled', label: 'text (disabled)', attributes: {disabled: true} },
    { type: 'time' },
    { type: 'url' },
    { type: 'week' }
  ];

  return (
    <>
      <Meta title="Next-js starter: form elements" />

      <Section container>
        <H1>Next-js starter: form elements</H1>
      </Section>

      <Section container>
        <form className="form">

          <div className="form__item">
            <label htmlFor={`input-type-select`}>select</label>
            <select id={`input-type-select`}>
              <option value="">--Please choose an option--</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option>
            </select>
          </div>

          {inputTypes.map((input, i) => {
            
            return (
              <div className="form__item" key={`input-type-${i}`}>
                <label htmlFor={`input-type-${input.type}`}>{input.label ?? input.type}</label>
                <input
                  id={`input-type-${i}`}
                  type={input.type}
                  defaultValue={input.value ?? undefined}
                  {...input.attributes}
                />
              </div>
            );
          })}
        </form>
      </Section>

      <style jsx>{`
      .form {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--gutter);
      
        max-width: 800px;
      }

      .form__item {
        display: grid;
        grid-column: span 2;
        align-items: center;
        grid-template-columns:  20ch 1fr;
    
        grid-template-columns: subgrid;
      }

      
      @supports (grid-template-columns: subgrid) {
        .form__item {
          text-align: right;
        }
      }
      `}</style>

    </>
  );
}
