import { supabase, POSTS_TABLE } from "../../../../db/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Post {
  id: number;
  Title: string;
  Summary: string;
  content: string;
  imageName: string;
  imageBase64: string;
  $createdAt: string;
}

export async function getStaticPaths(ctx: Object) {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return { notFound: true };
  }

  try {
    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return { notFound: true };
    }

    return {
      props: {
        data: data,
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};

const Post = ({ data }: { data: Post }) => {
  const router = useRouter();
  return (
    <div className="mt-4 w-full">
      <button
        className=" px-4 py-2 bg-black text-white ml-2 mb-1 rounded-md "
        onClick={() => router.back()}
      >
        back
      </button>
      <Image
        src={data.imageBase64}
        priority
        width={600}
        height={400}
        className="w-[300px] mx-auto md:mx-auto md:w-auto max-h-[700px] max-w-[800px] object-contain mt-4"
        alt="blog-banner"
      />
      <p className="text-center text-2xl font-semibold mt-2">{data.Title}</p>
      <p className="text-center text-lg text-neutral-800 mt-2 p-5">
        {data.Summary}
      </p>
      <div
        className="w-[90%] mx-auto"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
};
export default Post;
