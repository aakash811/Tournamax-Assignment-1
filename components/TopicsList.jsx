import TopicItem from "./TopicItem";

const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map((topic) => (
        <TopicItem key={topic._id} topic={topic} />
      ))}
    </>
  );
}
