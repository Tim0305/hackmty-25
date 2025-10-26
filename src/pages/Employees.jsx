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

export default function EmployeesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Datos por empleado
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Contenedor principal */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : ""
          }`}
      >
        {/* Encabezado */}
        <div className="flex items-center bg-white shadow-md p-4">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="ml-2 font-bold text-gray-800">
            Empleados
          </Typography>
        </div>

        {/* Contenido */}
        <div className="flex flex-1 overflow-hidden">
          {/* Lista lateral */}
          <div className="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
            <TextField
              label="Buscar empleado"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />

            {filteredEmployees.map((e) => (
              <Card
                key={e}
                onClick={() => setSelectedEmployee(e)}
                className={`mb-3 cursor-pointer hover:shadow-lg transition-transform hover:scale-[1.01] ${selectedEmployee === e ? "border-2 border-blue-500" : ""
                  }`}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    {e}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Panel derecho */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedEmployee ? (
              <>
                {/* Header del empleado */}
                <div className="flex items-center gap-4 mb-10">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      selectedEmployee,
                    )}&background=3B82F6&color=fff&size=96`}
                    alt={selectedEmployee}
                    className="w-16 h-16 rounded-full shadow-md border-2 border-blue-500"
                  />
                  <div>
                    <Typography
                      variant="h5"
                      className="font-bold text-[#F97316]"
                    >
                      {selectedEmployee}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      Empleado seleccionado
                    </Typography>
                  </div>
                </div>

                {/* Tarjetas resumen */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Card className="flex-1 shadow-lg">
                    <CardContent className="flex flex-col items-center justify-center">
                      <Typography variant="h6" className="text-gray-600">
                        Bandejas Totales
                      </Typography>
                      <Typography
                        variant="h2"
                        className="text-blue-600 !font-bold !mt-10"
                      >
                        {currentData.totalTrays}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card className="flex-1 shadow-lg">
                    <CardContent className="flex flex-col items-center justify-center">
                      <Typography variant="h6" className="text-gray-600">
                        Errores Totales
                      </Typography>
                      <Typography
                        variant="h2"
                        className="text-red-600 !font-bold !mt-10"
                      >
                        {currentData.totalErrors}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card className="flex-1 shadow-lg">
                    <CardContent className="flex flex-col items-center justify-center">
                      <Typography variant="h6" className="text-gray-600">
                        Tiempo Promedio / Bandeja
                      </Typography>
                      <Typography
                        variant="h2"
                        className="text-green-600 !font-bold !mt-10"
                      >
                        {currentData.avgTimePerTray} min
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card className="flex-1 shadow-lg">
                    <CardContent className="flex flex-col items-center justify-center">
                      <Typography variant="h6" className="text-gray-600">
                        Eficiencia
                      </Typography>
                      <Gauge
                        value={
                          currentData.totalTrays > 0
                            ? ((currentData.totalTrays -
                              currentData.totalErrors) /
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
                        variant="h5"
                        className="mt-2 font-bold text-blue-600"
                      >
                        {currentData.totalTrays > 0
                          ? Math.round(
                            ((currentData.totalTrays -
                              currentData.totalErrors) /
                              currentData.totalTrays) *
                            100,
                          )
                          : 0}
                        %
                      </Typography>
                    </CardContent>
                  </Card>
                </div>

                {/* Gráfica de errores */}
                <Card className="shadow-lg p-4">
                  <Typography
                    variant="h6"
                    className="mb-2 font-semibold text-gray-700"
                  >
                    Errores por Día
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
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
                </Card>
              </>
            ) : (
              <Typography
                variant="h6"
                className="text-gray-500 text-center mt-20"
              >
                Selecciona un empleado para ver su información
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
