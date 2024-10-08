import { WebComponent } from "web-component";
import PeerData, { SocketChannel } from "peer-data";

@WebComponent("webrtc-chat", {
  template: require("./chat.html")
})
export class Chat extends HTMLElement {
  constructor() {
    super();

    const servers = {
      iceServers: [
        {
          // url: "stun:stun.1.google.com:19302"
          url: "stun:74.125.142.127:19302"
        },
        {
          urls: "turn:turn.bistri.com:80",
          credential: "homeo",
          username: "homeo"
        }
      ]
    };
    const constraints = {
      ordered: true
    };

    this.peerData = new PeerData(servers, constraints);
    this.signaling = new SocketChannel();
  }

  createRoom(id, username, stream) {
    if (id.length > 0 && username.length > 0) {
      let room = document.createElement("webrtc-room");
      room.id = id;
      room.username = username;
      room.peerData = this.peerData;
      room.setStream(stream);

      this.querySelector(".rooms").appendChild(room);

      return room;
    }
  }

  removeRoom(id) {
    const children = this.querySelector(".rooms").children;
    Array.from(children).forEach(room => {
      if (room.id === id) {
        room.disconnect();
        return room.parentNode.removeChild(room);
      }
    });
  }
}
