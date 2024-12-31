import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("{}");
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApiCall = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const parsedHeaders = headers ? JSON.parse(headers) : {};
      const parsedBody = body ? JSON.parse(body) : null;

      const config = {
        method,
        url,
        headers: parsedHeaders,
        data: ["POST", "PUT", "PATCH"].includes(method) ? parsedBody : null,
      };

      const result = await axios(config);
      setResponse(result.data);
    } catch (err) {
      setError(err.response ? err.response.data : "Request Failed");
    } finally {
      setLoading(false);
    }
  };

  const endpoints = [
    {
      category: "Auth Routes",
      endpoints: [
        {
          method: "POST",
          url: "/auth/adminRegister",
          description: "Register Admin",
          headers: "{}",
          body: `{
            "userName": "admin123",
            "email": "admin@example.com",
            "password": "securePassword123"
          }`,
        },
        {
          method: "POST",
          url: "/auth/busOperatorRegister",
          description: "Register Bus Operator",
          headers: "{}",
          body: `{
            "businessName": "Speedy Transport",
            "email": "operator@example.com",
            "password": "securePassword123",
            "location": "New York",
            "NoOfBusses": 5
          }`,
        },
        {
          method: "POST",
          url: "/auth/commuterRegister",
          description: "Register Commuter",
          headers: "{}",
          body: `{
            "firstName": "John",
            "lastName": "Doe",
            "email": "commuter@example.com",
            "password": "securePassword123"
          }`,
        },
        {
          method: "POST",
          url: "/auth/adminLogin/{email}/{password}",
          description: "Admin Login",
          headers: "{}",
          body: "{}",
        },
        {
          method: "POST",
          url: "/auth/busOperatorLogin/{email}/{password}",
          description: "Bus Operator Login",
          headers: "{}",
          body: "{}",
        },
        {
          method: "POST",
          url: "/auth/commutorLogin/{email}/{password}",
          description: "Commuter Login",
          headers: "{}",
          body: "{}",
        },
      ],
    },
    {
      category: "Admin Routes",
      endpoints: [
        {
          method: "GET",
          url: "/admin/GetPendingBusOperators",
          description: "Get Pending Bus Operators",
          headers: "{}",
          body: "{}",
        },
        {
          method: "GET",
          url: "/admin/getBusDetailsForApproval",
          description: "Get Bus Details for Approval",
          headers: "{}",
          body: "{}",
        },
        {
          method: "POST",
          url: "/admin/ApproveOrRejectBusOperator/{id}/{status}",
          description: "Approve/Reject Bus Operator",
          headers: "{}",
          body: "{}",
        },
        {
          method: "POST",
          url: "/admin/ApproveOrRejectBusDetails/{id}/{busNo}/{status}",
          description: "Approve/Reject Bus Details",
          headers: "{}",
          body: "{}",
        },
        {
          method: "GET",
          url: "/admin/ViewRegisteredBusOperators",
          description: "View Registered Bus Operators",
          headers: "{}",
          body: "{}",
        },
        {
          method: "GET",
          url: "/admin/ViewRejectedBusOperators",
          description: "View Rejected Bus Operators",
          headers: "{}",
          body: "{}",
        },
        {
          method: "POST",
          url: "/admin/addBusRoutes",
          description: "Add Bus Route",
          headers: "{}",
          body: `{
            "routeId": "RT001",
            "routeStart": "City A",
            "routeEnd": "City B"
          }`,
        },
      ],
    },
    {
      category: "Bus Operator Routes",
      endpoints: [
        {
          method: "POST",
          url: "/busOperator/editBusOperator",
          description: "Edit Bus Operator",
          headers: "{}",
          body: `{
            "id": "63a45b6e4c3a2c0012f5e89d",
            "businessName": "New Express Transport",
            "email": "operator@example.com",
            "password": "newPassword123",
            "location": "New York",
            "NoOfBusses": 5
          }`,
        },
        {
          method: "POST",
          url: "/busOperator/addBuses",
          description: "Add Buses for Approval",
          headers: "{}",
          body: `{
            "id": "63a45b6e4c3a2c0012f5e89d",
            "PermitNo": "12345ABC",
            "busNo": "NY1234",
            "noOfSeats": 50,
            "condition": "Good",
            "routeID": "RT001",
            "structure": "Double-decker"
          }`,
        },
        {
          method: "POST",
          url: "/busOperator/scheduleABus",
          description: "Schedule a Bus",
          headers: "{}",
          body: `{
            "busid": "63a45b6e4c3a2c0012f5e89d",
            "date": "2024-12-30",
            "startTime": "08:00:00",
            "endTime": "10:00:00",
            "startFrom": "City A",
            "endFrom": "City B",
            "price": 15.50,
            "driverName": "John Doe",
            "driverLicenseNo": "D123456",
            "conductorName": "Jane Smith",
            "conductorId": "C78901"
          }`,
        },
        {
          method: "GET",
          url: "/busOperator/viewBOBusdetails/{id}",
          description: "View Bus Operator Bus Details",
          headers: "{}",
          body: "{}",
        },
        {
          method: "GET",
          url: "/busOperator/viewBusSchedules/{busid}",
          description: "View Bus Schedules",
          headers: "{}",
          body: "{}",
        },
        {
          method: "GET",
          url: "/busOperator/viewBusSeatReservations/{runTimeId}",
          description: "View Bus Seat Reservations",
          headers: "{}",
          body: "{}",
        },
      ],
    },
    {
      category: "Commuter Routes",
      endpoints: [
        {
          method: "GET",
          url: "/commutor/searchBusses",
          description: "Search Busses",
          headers: "{}",
          body: "{}",
        },
        {
          method: "POST",
          url: "/commutor/reserveSeat",
          description: "Reserve Seat",
          headers: "{}",
          body: `{
            "runTimeId": "R12345",
            "bookedSeatNumbers": [1, 2, 3],
            "SeatProce": 15.50,
            "PaymentCompleted": true,
            "bookedAt": "2024-12-30T08:00:00Z"
          }`,
        },
        {
          method: "GET",
          url: "/commutor/viewUserReservations",
          description: "View User Reservations",
          headers: "{}",
          body: "{}",
        },
        {
          method: "POST",
          url: "/commutor/cancelReservation",
          description: "Cancel Reservation",
          headers: "{}",
          body: `{
            "runTimeId": "R12345",
            "seatNo": 1,
            "totalPrice": 15.50
          }`,
        },
      ],
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Bus Reservation System - API Tester</h1>
      <p>Select an endpoint, adjust parameters, and test the API.</p>

      {endpoints.map((category, idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          <h2>{category.category}</h2>
          {category.endpoints.map((ep, i) => (
            <button
              key={i}
              onClick={() => {
                setMethod(ep.method);
                setUrl(`https://api-df69.onrender.com${ep.url}`);
                setHeaders(ep.headers);
                setBody(ep.body);
              }}
              style={{
                margin: "5px",
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              {ep.method} {ep.description}
            </button>
          ))}
        </div>
      ))}

      <div style={{ margin: "20px 0" }}>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: "100%", margin: "10px 0", padding: "8px" }}
          />
        </label>
        <label>
          Headers (JSON):
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            style={{ width: "100%", height: "80px", margin: "10px 0", padding: "8px" }}
          />
        </label>
        {["POST", "PUT", "PATCH"].includes(method) && (
          <label>
            Body (JSON):
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ width: "100%", height: "100px", margin: "10px 0", padding: "8px" }}
            />
          </label>
        )}
      </div>

      <button
        onClick={handleApiCall}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send Request
      </button>

      {loading && <p>Loading...</p>}
      {response && (
        <div style={{ marginTop: "20px" }}>
          <h2>Response:</h2>
          <pre style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h2>Error:</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
