// global components
import { H1 } from 'components/heading/Heading';
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
    { type: 'tel', value: '+354' },
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
        <form>
          <fieldset>
            <div className="form">
              <div className="form__item" style={{ alignItems: 'start'}}>
                <label htmlFor={`textarea`}>textarea</label>
                <textarea id="textarea" rows={10}></textarea>
              </div>

              <div className="form__item">
                <label htmlFor={`input-type-select`}>select</label>
                <select id={`input-type-select`}>
                  <optgroup label="Theropods">
                    <option>Tyrannosaurus</option>
                    <option>Velociraptor</option>
                    <option>Deinonychus</option>
                  </optgroup>
                  <optgroup label="Sauropods">
                      <option>Diplodocus</option>
                      <option>Saltasaurus</option>
                      <option>Apatosaurus</option>
                  </optgroup>
                </select>
              </div>

              {inputTypes.map((input, i) => {
                
                return (
                  <div className="form__item" key={`input-type-${i}`}>
                    <label htmlFor={`input-type-${input.type}-${i}`}>{input.label ?? input.type}</label>
                    <input
                      id={`input-type-${input.type}-${i}`}
                      type={input.type}
                      defaultValue={input.value ?? undefined}
                      {...input.attributes}
                    />
                  </div>
                );
              })}

              <div className="form__item">
                <label htmlFor="input-type-datalist">Input w. datalist</label>
                <input id="input-type-datalist" list="ice-cream-flavors" />
              </div>
            </div>

            <datalist id="ice-cream-flavors">
              <option value="Chocolate" />
              <option value="Coconut" />
              <option value="Mint" />
              <option value="Strawberry" />
              <option value="Vanilla" />
            </datalist>
          </fieldset>
        </form>
      </Section>

      {/* below is only for layout presentation */}
      <style jsx>{`
      .form {
        display: grid;
        grid-template-columns: minmax(max-content, 200px) minmax(0, 1fr);
        gap: var(--gutter);
        align-items: center;
        justify-content: start;
      
        max-width: 800px;
      }

      .form__item {
        display: grid;
        grid: inherit;
        grid-gap: calc(var(--gutter) / 2);
        grid-column: span 2;

        grid-template-columns: repeat(auto-fill, 100%);
      }

      @media (min-width: 600px) {
        .form__item {
          align-items: center;
          justify-content: start;
          grid-gap: inherit;
          grid-template-columns: 20ch minmax(0, 1fr);
          grid-template-columns: subgrid;
        }

        .form__item label {
          justify-self: end;
        }
        
        .form__item input[type=radio],
        .form__item input[type=checkbox] {
          justify-self: start;
        }
      }
      `}</style>

    </>
  );
}
