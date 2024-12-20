import MessageList from "../components/MessageList";

export default function MessagesSection({ user }) {
  return (
    <section id="messages" className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Messages</h2>
      <MessageList user={user} />
    </section>
  );
}
