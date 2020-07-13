import { H1, H2 } from 'components/heading/Heading';
import { Link } from 'components/link/Link';
import { RichText } from 'components/rich-text/RichText';
import { Section } from 'components/section/Section';

export default function Home() {

  return (
    <>
      <Section container as="div">
        <H1>Next-js starter</H1>

        <RichText>
          <p>The kit constistutes bootstrapping (S)CSS and some commonly-used React component patterns and functionality.</p>
          <H2 as="h3" style={{ marginBottom: '-1ex' }}>What this kit includes:</H2>

          <ul>
            <li>Grid layout using simple <code>CSS Grid</code> <code>scss</code> mixins</li>
            <li>Simple components for common layout patterns (using css modules)</li>
            <li>Page transitions using <code>react-transition-group</code></li>
            <li>Responsive typography</li>
            <li>Mobile / desktop style navigations</li>
            <li>UI context <code>Provider</code> for common global states</li>
            <li>useful <code>hooks</code> for: 
              <ul>
                <li>local storage</li>
                <li>resize</li>
                <li>keydown</li>
              </ul>
            </li>
            <li>Grid visiual reference overlay tool to help aligning layout</li>
            <li>SEO <code>&lt;Meta&gt;</code> component w. simple default setup</li>
            <li>SVG imports as React <code>&lt;Component&gt;</code>s</li>
            <li><code>&lt;Picture&gt;</code> component with sanitised media-query / srcset props</li>
            <li>Basic dark-mode css custom property config</li>
            <li>lots of other small bits & pieces; the <Link to="/examples">examples page</Link> has examples</li>

            <li>TODO: 
              <ul>
                <li>video (+ autoplay?) component</li>
                <li>fallbacks for IE11 (css vars, css grid {'>'} flexbox)</li>
              </ul>
            </li>

          </ul>
          
        </RichText>
      </Section>
    </>
  )
}
