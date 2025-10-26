import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
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
import { Gauge, gaugeClasses } from "@mui/x-charts";

export default function Employees() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Datos de ejemplo por empleado
  const employeesData = {
    "Juan Pérez": {
      totalTrays: 50,
      totalErrors: 10,
      avgTimePerTray: 3.2,
      dataErrorsPerDay: [
        { day: "Lunes", errors: 2 },
        { day: "Martes", errors: 3 },
        { day: "Miércoles", errors: 1 },
        { day: "Jueves", errors: 2 },
        { day: "Viernes", errors: 2 },
      ],
    },
    "Ana Gómez": {
      totalTrays: 40,
      totalErrors: 5,
      avgTimePerTray: 2.8,
      dataErrorsPerDay: [
        { day: "Lunes", errors: 1 },
        { day: "Martes", errors: 1 },
        { day: "Miércoles", errors: 2 },
        { day: "Jueves", errors: 0 },
        { day: "Viernes", errors: 1 },
      ],
    },
    "Carlos Ruiz": {
      totalTrays: 60,
      totalErrors: 12,
      avgTimePerTray: 3.5,
      dataErrorsPerDay: [
        { day: "Lunes", errors: 3 },
        { day: "Martes", errors: 2 },
        { day: "Miércoles", errors: 4 },
        { day: "Jueves", errors: 1 },
        { day: "Viernes", errors: 2 },
      ],
    },
    "Luisa Díaz": {
      totalTrays: 30,
      totalErrors: 8,
      avgTimePerTray: 4.0,
      dataErrorsPerDay: [
        { day: "Lunes", errors: 2 },
        { day: "Martes", errors: 1 },
        { day: "Miércoles", errors: 1 },
        { day: "Jueves", errors: 2 },
        { day: "Viernes", errors: 2 },
      ],
    },
  };

  const employees = Object.keys(employeesData);
  const filteredEmployees = employees.filter((e) =>
    e.toLowerCase().includes(search.toLowerCase()),
  );

  const currentData = selectedEmployee
    ? employeesData[selectedEmployee]
    : {
      totalTrays: 0,
      totalErrors: 0,
      avgTimePerTray: 0,
      dataErrorsPerDay: [],
    };

  const dataArc = [
    { name: "Errores", value: currentData.totalErrors },
    {
      name: "Bandejas buenas",
      value: currentData.totalTrays - currentData.totalErrors,
    },
  ];
  const COLORS = ["#EF4444", "#3B82F6"];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onClickItem={() => setIsSidebarOpen(false)}
      />

      <main
        className={`flex-1 p-8 bg-gray-50 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : ""
          }`}
      >
        {/* Botón hamburguesa */}
        <div className="mb-4">
          <IconButton
            className="bg-white shadow"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Panel izquierdo */}
          <div className="flex flex-col w-full md:w-80 gap-4">
            <TextField
              label="Buscar empleado"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
              {filteredEmployees.map((e) => (
                <Card
                  key={e}
                  className={`shadow-sm w-full cursor-pointer ${selectedEmployee === e ? "bg-blue-100" : ""
                    }`}
                  onClick={() => setSelectedEmployee(e)}
                >
                  <CardContent className="p-2">
                    <Typography className="text-center">{e}</Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Panel derecho */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Resumen Cards */}
            <div className="flex flex-col md:flex-row gap-4">
              <Card className="shadow-lg w-full md:w-1/4 flex">
                <CardContent className="flex flex-col items-center justify-center w-full h-full p-4">
                  <Typography variant="h6" gutterBottom>
                    Bandejas totales
                  </Typography>
                  <Typography variant="h2" className="text-blue-600 !font-bold">
                    {currentData.totalTrays}
                  </Typography>
                </CardContent>
              </Card>

              <Card className="shadow-lg w-full md:w-1/4 flex">
                <CardContent className="flex flex-col items-center justify-center w-full h-full p-4">
                  <Typography variant="h6" gutterBottom>
                    Errores totales
                  </Typography>
                  <Typography variant="h2" className="text-red-600 !font-bold">
                    {currentData.totalErrors}
                  </Typography>
                </CardContent>
              </Card>

              <Card className="shadow-lg w-full md:w-1/4 flex">
                <CardContent className="flex flex-col items-center justify-center w-full h-full p-4">
                  <Typography variant="h6" gutterBottom>
                    Tiempo promedio / bandeja
                  </Typography>
                  <Typography
                    variant="h2"
                    className="text-green-600 !font-bold"
                  >
                    {currentData.avgTimePerTray} min
                  </Typography>
                </CardContent>
              </Card>

              <Card className="shadow-lg w-full md:w-1/4 flex">
                <CardContent className="flex flex-col items-center justify-center w-full h-full p-4">
                  <Typography variant="h6" gutterBottom>
                    Eficiencia
                  </Typography>
                  <Gauge
                    value={
                      currentData.totalTrays > 0
                        ? ((currentData.totalTrays - currentData.totalErrors) /
                          currentData.totalTrays) *
                        100
                        : 0
                    }
                    startAngle={0}
                    endAngle={360}
                    innerRadius="70%"
                    outerRadius="100%"
                    cornerRadius="50%"
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 24,
                        fill: "#3B82F6",
                      },
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: "#3B82F6",
                      },
                      [`& .${gaugeClasses.referenceArc}`]: {
                        fill: "#E5E7EB",
                      },
                    }}
                  />
                  <Typography
                    variant="h4"
                    className="mt-2 !font-bold text-blue-600"
                  >
                    {currentData.totalTrays > 0
                      ? Math.round(
                        ((currentData.totalTrays - currentData.totalErrors) /
                          currentData.totalTrays) *
                        100,
                      )
                      : 0}
                    %
                  </Typography>
                </CardContent>
              </Card>
            </div>

            {/* Gráfica de errores por día */}
            <Card className="shadow-lg w-full flex-1">
              <CardContent className="h-[400px]">
                <Typography variant="h6" gutterBottom>
                  Errores por día
                </Typography>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={currentData.dataErrorsPerDay}>
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
