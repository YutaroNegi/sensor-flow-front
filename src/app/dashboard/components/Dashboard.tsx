"use client";

import { useState, useEffect } from "react";
import { LogoutButton } from "./LogoutButton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SensorDataItem {
  equipmentId: string;
  totalValue: number;
  sampleCount: number;
  intervalStartTime: number;
}

interface SensorData {
  average: number;
  totalCount: number;
  items: SensorDataItem[];
}

const intervals = [
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 48 Hours", value: "48h" },
  { label: "Last Week", value: "1w" },
  { label: "Last Month", value: "1m" },
];

const Dashboard: React.FC = () => {
  const [interval, setInterval] = useState<string>("1m");
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSensorData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sensor-data-aggregated?interval=${interval}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sensor data");
      }
      const result: SensorData = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
  }, [interval]);

  const handleIntervalChange = (value: string) => {
    setInterval(value);
  };

  const chartData =
    data?.items.map((item: SensorDataItem) => ({
      equipmentId: item.equipmentId,
      averageValue: parseFloat((item.totalValue / item.sampleCount).toFixed(2)),
      intervalStart: new Date(item.intervalStartTime * 1000).toLocaleDateString(),
    })) || [];

  return (
    <div style={{ width: "75%", margin: 'auto'}}>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <LogoutButton />

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Sensor Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-semibold">Average: </span>
              {data ? data.average.toFixed(2) : "---"}
            </div>
            <div>
              <span className="font-semibold">Total Samples: </span>
              {data ? data.totalCount : "---"}
            </div>
            <div>
              <Select value={interval} onValueChange={handleIntervalChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  {intervals.map((i) => (
                    <SelectItem key={i.value} value={i.value}>
                      {i.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : data ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="intervalStart" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="averageValue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div>No data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
