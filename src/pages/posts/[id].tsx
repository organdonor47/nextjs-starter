import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllPostIds, getPostData } from 'lib/posts';
import { H1 } from 'components/heading/Heading';
import { Section } from 'components/section/Section';
import { RichText } from 'components/rich-text/RichTextStatic';
import { Meta } from 'components/meta/Meta';

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <>
      <Meta title={postData.title} />
      <Section as="article" container>
        <H1>{postData.title}</H1>
        <time>{postData.date}</time>
        <RichText html={postData.contentHtml} />
      </Section>
    </>
  );
}

// eslint-disable-next-line require-await
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
