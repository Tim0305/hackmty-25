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

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { name: "Galletas Canelitas", id: 1 },
    { name: "Galletas Príncipe", id: 2 },
    { name: "Coca-Cola", id: 3 },
    { name: "Electrolit", id: 4 },
  ];

  const productsData = {
    "Galletas Canelitas": {
      totalErrors: 23,
      totalSales: 240,
      errorsOverTime: [
        { date: "Lun", errors: 2 },
        { date: "Mar", errors: 3 },
        { date: "Mié", errors: 5 },
        { date: "Jue", errors: 7 },
        { date: "Vie", errors: 6 },
      ],
      salesOverTime: [
        { date: "Lun", sales: 30 },
        { date: "Mar", sales: 40 },
        { date: "Mié", sales: 45 },
        { date: "Jue", sales: 50 },
        { date: "Vie", sales: 75 },
      ],
    },
    "Galletas Príncipe": {
      totalErrors: 15,
      totalSales: 200,
      errorsOverTime: [
        { date: "Lun", errors: 1 },
        { date: "Mar", errors: 4 },
        { date: "Mié", errors: 3 },
        { date: "Jue", errors: 5 },
        { date: "Vie", errors: 2 },
      ],
      salesOverTime: [
        { date: "Lun", sales: 25 },
        { date: "Mar", sales: 40 },
        { date: "Mié", sales: 50 },
        { date: "Jue", sales: 45 },
        { date: "Vie", sales: 40 },
      ],
    },
    "Coca-Cola": {
      totalErrors: 30,
      totalSales: 400,
      errorsOverTime: [
        { date: "Lun", errors: 4 },
        { date: "Mar", errors: 6 },
        { date: "Mié", errors: 5 },
        { date: "Jue", errors: 8 },
        { date: "Vie", errors: 7 },
      ],
      salesOverTime: [
        { date: "Lun", sales: 60 },
        { date: "Mar", sales: 75 },
        { date: "Mié", sales: 85 },
        { date: "Jue", sales: 90 },
        { date: "Vie", sales: 90 },
      ],
    },
    Electrolit: {
      totalErrors: 8,
      totalSales: 150,
      errorsOverTime: [
        { date: "Lun", errors: 0 },
        { date: "Mar", errors: 2 },
        { date: "Mié", errors: 1 },
        { date: "Jue", errors: 3 },
        { date: "Vie", errors: 2 },
      ],
      salesOverTime: [
        { date: "Lun", sales: 20 },
        { date: "Mar", sales: 25 },
        { date: "Mié", sales: 30 },
        { date: "Jue", sales: 35 },
        { date: "Vie", sales: 40 },
      ],
    },
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentData = selectedProduct ? productsData[selectedProduct] : null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Contenedor principal */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : ""
        }`}
      >
        {/* Encabezado */}
        <div className="flex items-center bg-white shadow-md p-4">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="ml-2 font-bold text-gray-800">
            Productos
          </Typography>
        </div>

        {/* Contenido */}
        <div className="flex flex-1 overflow-hidden">
          {/* Lista lateral */}
          <div className="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
            <TextField
              label="Buscar producto"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />

            {filteredProducts.map((p) => (
              <Card
                key={p.id}
                onClick={() => setSelectedProduct(p.name)}
                className={`mb-3 cursor-pointer hover:shadow-lg transition-transform hover:scale-[1.01] ${
                  selectedProduct === p.name ? "border-2 border-blue-500" : ""
                }`}
              >
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-gray-800">
                    {p.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Panel derecho */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedProduct ? (
              <>
                {/* Título del producto */}
                <Typography variant="h4" className="font-bold text-[#F97316] !mb-10">
                  {selectedProduct}
                </Typography>

                {/* Tarjetas resumen */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Card className="flex-1 shadow-lg">
                    <CardContent className="flex flex-col items-center justify-center">
                      <Typography variant="h6" className="text-gray-600">
                        Total de Errores
                      </Typography>
                      <Typography variant="h2" className="text-red-600 !font-bold !mt-10">
                        {currentData.totalErrors}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card className="flex-1 shadow-lg">
                    <CardContent className="flex flex-col items-center justify-center">
                      <Typography variant="h6" className="text-gray-600">
                        Total de Ventas
                      </Typography>
                      <Typography variant="h2" className="text-green-600 !font-bold !mt-10">
                        {currentData.totalSales}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>

                {/* Gráficas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Errores en el tiempo */}
                  <Card className="shadow-lg p-4">
                    <Typography variant="h6" className="mb-2 font-semibold text-gray-700">
                      Errores en el tiempo
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={currentData.errorsOverTime}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="errors"
                          stroke="#ef4444"
                          strokeWidth={3}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Ventas en el tiempo */}
                  <Card className="shadow-lg p-4">
                    <Typography variant="h6" className="mb-2 font-semibold text-gray-700">
                      Ventas en el tiempo
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={currentData.salesOverTime}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          stroke="#22c55e"
                          strokeWidth={3}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </div>
              </>
            ) : (
              <Typography variant="h6" className="text-gray-500 text-center mt-20">
                Selecciona un producto para ver su información
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
