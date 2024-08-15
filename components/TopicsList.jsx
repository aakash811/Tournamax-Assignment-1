import TopicItem from "./TopicItem";

export default async function TopicsList() {
  const getTopics = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
        cache: "no-store",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
        },
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
