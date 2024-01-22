// updateWorker.js
const workerCode = () => {
  const broadcastChannel = new BroadcastChannel("sharedChannel");

  onmessage = (e) => {
    const dataReceived = e.data;
    const result = dataReceived; // Double the received data

    // Send the result to other tabs through the broadcast channel
    broadcastChannel.postMessage({ type: "update", data: result });
  };
};

export default () => {
  const blob = new Blob([`(${workerCode.toString()})()`], {
    type: "application/javascript",
  });
  return new Worker(URL.createObjectURL(blob));
};
