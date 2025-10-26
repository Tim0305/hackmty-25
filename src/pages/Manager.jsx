import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Manager() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const data = [
    { day: "Lunes", errors: 50 },
    { day: "Martes", errors: 70 },
    { day: "Miércoles", errors: 30 },
    { day: "Jueves", errors: 10 },
    { day: "Viernes", errors: 2 },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onClickItem={() => setIsSidebarOpen(false)}
      />

      <main
        className={`flex-1 p-8 bg-gray-50 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : ""
        }`}
      >
        <div className="mb-4">
          <IconButton
            className="bg-white shadow"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </div>

        <div className="flex flex-col pr-10 pb-10 pl-10">
          <h1 className="text-orange-500 text-6xl font-bold mb-15 ml-1 md:ml-0">
            Bienvenido, Víctor!
          </h1>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-10">
              <Card className="shadow-lg w-full">
                <CardContent className="flex flex-col items-center p-4">
                  <Typography variant="h6" gutterBottom>
                    Bandejas hechas hoy
                  </Typography>
                  <Typography variant="h2" className="text-blue-600 !font-bold">
                    42
                  </Typography>
                </CardContent>
              </Card>

              <Card className="shadow-lg w-full">
                <CardContent className="flex flex-col items-center p-4">
                  <Typography variant="h6" gutterBottom>
                    Errores hoy
                  </Typography>
                  <Typography variant="h2" className="text-red-600 !font-bold">
                    1
                  </Typography>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg flex-1">
              <CardContent className="h-[500px]">
                <Typography variant="h6" gutterBottom>
                  Errores por día
                </Typography>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="errors"
                      stroke="#3b82f6"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
