import TopicItem from "./TopicItem";

export default async function TopicsList() {
  const getTopics = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }

      const data = await res.json();
      return { topics: data.topics || [] };
    } catch (error) {
      console.log("Error loading topics: ", error);
      return { topics: [] };
    }
  };

  const { topics } = await getTopics();

  return (
    <>
      {topics.map((topic) => (
        <TopicItem key={topic._id} topic={topic} />
      ))}
    </>
  );
}
