import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { age: 0, normal: 3.3, mam: 2.9, sam: 2.5 },
  { age: 6, normal: 7.8, mam: 6.8, sam: 6.0 },
  { age: 12, normal: 9.5, mam: 8.5, sam: 7.5 },
  { age: 24, normal: 12.5, mam: 11.0, sam: 9.5 },
  { age: 36, normal: 14.5, mam: 13.0, sam: 11.0 },
  { age: 48, normal: 16.5, mam: 15.0, sam: 13.0 },
  { age: 60, normal: 19.0, mam: 17.0, sam: 15.0 },
];

function GrowthChart() {
  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ fontFamily: 'Nyala' }}>የክብደት እድገት ገበታ</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="age" label={{ value: 'ዕድሜ (በወር)', position: 'insideBottom' }} />
          <YAxis label={{ value: 'ክብደት (ኪ.ግ)', angle: -90 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="normal" stroke="#4CAF50" name="መደበኛ" />
          <Line type="monotone" dataKey="mam" stroke="#FF9800" name="MAM" />
          <Line type="monotone" dataKey="sam" stroke="#F44336" name="SAM" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GrowthChart;