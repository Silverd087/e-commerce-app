import axios from "axios";
import { useEffect, useState } from "react";

export default function MessageList({ user }) {
  const [selectedMessage, setSelectedMessage] = useState();
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState([]);
  const url = "https://sbabeetbackend.onrender.com/api/messages";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setMessages(response.data.messages);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMessageClick = (message) => {
    if (selectedMessage?._id === message._id) {
      setSelectedMessage(null);
      setReply("");
    } else {
      setSelectedMessage(message);
      if (message.read == false) {
        message.read = true;
        axios
          .put(`${url}/${message._id}`, message)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !reply) return;

    try {
      await sendEmail(selectedMessage.from, reply);
      const newMessage = { ...selectedMessage, reply: reply };
      axios
        .put(`${url}/${selectedMessage._id}`, newMessage)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setReply("");
      setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border-2 border-opacity-10 border-primary">
      <div className="card-body">
        <h2 className="card-title text-primary">Inbox</h2>
        <p className="text-gray-600">Messages from the contact form</p>

        <div className="h-[300px] overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message._id}
                className="flex items-center space-x-4 p-4 hover:bg-primary hover:bg-opacity-5 transition-colors cursor-pointer"
                onClick={() => handleMessageClick(message)}
              >
                <div className="avatar placeholder">
                  <div className="bg-primary bg-opacity-5 text-primary rounded-full w-10">
                    <span>{message.from[0].toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {message.from}
                  </p>
                  <p className="text-sm text-base-content/60">
                    {message.message}
                  </p>
                </div>
                <p className="text-sm text-base-content/60">{message.date}</p>
                {!message.read && (
                  <div className="badge badge-error badge-xs"></div>
                )}
              </div>
            ))
          ) : (
            <tr>
              <td className="text-center py-4">
                <div className="flex flex-col items-center justify-center text-base-content/60">
                  <p className="font-medium">No messages found</p>
                </div>
              </td>
            </tr>
          )}
        </div>

        {selectedMessage && (
          <div className="mt-8">
            <div className="divider"></div>
            {/* Original message */}
            <div className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex justify-between text-sm text-base-content/60">
                  <span>From: {selectedMessage.from}</span>
                  <span>{selectedMessage.date}</span>
                </div>
                <p className="text-sm mt-4">{selectedMessage.message}</p>
              </div>
            </div>
            {selectedMessage.reply && (
              <div className="card mt-10 bg-base-200">
                <div className="card-body p-4">
                  <div className="flex justify-between text-sm text-base-content/60">
                    <span>From: {user.email}</span>
                  </div>
                  <p className="text-sm mt-4">{selectedMessage.reply}</p>
                </div>
              </div>
            )}

            {/* Reply section */}
            <div className="card bg-base-100 mt-4">
              <div className="card-body p-4">
                <h3 className="text-sm font-medium text-base-content/60 mb-2">
                  Reply to: {selectedMessage.from}
                </h3>
                <textarea
                  className="textarea textarea-bordered w-full min-h-[100px] mb-2"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                />
                <div className="card-actions justify-end">
                  <button onClick={handleSendReply} className="btn btn-primary">
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
