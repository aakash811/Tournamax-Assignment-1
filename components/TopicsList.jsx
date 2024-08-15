import TopicItem from "./TopicItem";

const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = await res.json();
    console.log("Fetched topics data:", data);
    return { topics: data.topics || [] };
  } catch (error) {
    console.log("Error loading topics: ", error);
    return { topics: [] };
  }
};

export default async function TopicsList() {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    return null;
  }
  const { topics } = await getTopics();

  if (!Array.isArray(topics)) {
    console.error("Invalid topics data:", topics);
    return <p>Failed to load topics</p>;
  }

  return (
    <>
      {topics.length > 0 ? (
        topics.map((topic) => {
          const { _id, title } = topic;
          if (!_id || !title) {
            console.error("Invalid topic object:", topic);
            return null;
          }

          return <TopicItem key={_id} topic={topic} />;
        })
      ) : (
        <p className="text-center">No topics available</p>
      )}
    </>
  );
}
