// global components
import { Meta } from 'components/meta/Meta';
import { RichTextStatic } from 'components/rich-text/RichTextStatic';
import { Section } from 'components/section/Section';

export default function HtmlPage() {
  return (
    <>
      <Meta title="Next-js starter: form elements" />

      <Section container>
        <RichTextStatic>
          <h2>Matri inter super natus</h2>
          <p>
            Lorem markdownum fruges durum Tirynthius redolentia apud, nescit quinque est
            inputat undis. Quod cum natum opportuna speratque ista nexilibus terra,
            externo, modo. In tenus quidve prodis, adgnovitque parum: ultroque dextro
            fronde.
          </p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>
              Item 3
              <ul>
                <li>Item 3a</li>
                <li>Item 3b</li>
                <li>Item 3c</li>
              </ul>
            </li>
          </ul>

          <ol>
            <li>Nec aetas sacri nescius</li>
            <li>Nostro et in iustius exturbare tumefecit inque</li>
            <li>
              Condidit et ista
              <ol>
                <li>Step 3.1</li>
                <li>Step 3.2</li>
                <li>Step 3.3</li>
              </ol>
            </li>
            <li>Ascac</li>
            <li>Ascac (again)</li>
          </ol>

          <h3>Rapidum vaticinos neque de undas versus cognoscenda</h3>
          <p>
            Armentis formosus ut domos, usquam meus munus ego supera passim et? Temptanda
            ne auris succidere quaeque visura. Teneas avem! Vidit nunc non revocantis
            vultum.
          </p>
          <h4>Utque inmissa arsuro duplici icta timetque fertque</h4>
          <p>
            Oculos subito, locutum, <a href="https://hugsmidjan.is">collaque mentis</a> ea
            caesa <strong>Liternum</strong> petiitque <strong>aversata donec</strong>,
            ratione vicinos ignem. A tertia stagnumque concidere et ergo,{' '}
            <a href="https://hugsmidjan.is/6klst">invita cursu illa</a> rector; virgo.
            Iuppiter locum: digna nutu repetens, quis nasci summas graia illo, hominis,
            protinus et lucem stellatus.
          </p>
          <h5>Quis nasci summas</h5>
          <p>
            Confinia quoque numina. Adveniens ad sceptra spectans foedantem! Auget vacuas
            Parthaoniae orantem aures. Nato Nostra in cognatumque quoque. Vastum tenet
            tuque quam duabus: incoluit: usus prior, traduxit.
          </p>
          <h6>Quod cum natum opportuna speratque ista</h6>
          <p>
            Lorem markdownum fruges durum Tirynthius redolentia apud, nescit quinque est
            inputat undis. Quod cum natum opportuna speratque ista nexilibus terra,
            externo, modo. In tenus quidve prodis, adgnovitque parum: ultroque dextro
            fronde.
          </p>
          <hr />
          <h2>Nec esset</h2>
          <p>
            Quantus in, in nunc, mihi veterum, totidem! Nec pedum extenuatur fautrix
            Haemonia simplex! <em>Dei tamen egerat</em> non ferit inquit parte, est{' '}
            <em>qualia</em>, timent certa dixerat! Nec at merentem pressit. Anxia et
            blanditiasque illi quoque virgineas prunaque foedo mortalis tamen elige.
          </p>
          <h2>Deforme dixit pura tectis latos uno est</h2>
          <p>
            Confinia quoque numina. Adveniens ad sceptra spectans foedantem! Auget vacuas
            Parthaoniae orantem aures. Nato Nostra in cognatumque quoque. Vastum tenet
            tuque quam duabus: incoluit: usus prior, traduxit.
          </p>
          <p>
            Litora sanguine toto aethera{' '}
            <a href="https://www.arsenal.com/">mandata manifestaque moenia</a> laceris
            odoribus Amor tegebant. Precatur plura de quem inplet silvamque meorum Aurora
            arma secabant. Lege et patiuntur cibus.
          </p>
        </RichTextStatic>
      </Section>
    </>
  );
}
