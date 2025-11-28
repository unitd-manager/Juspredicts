import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const Portfolio: React.FC = () => {
  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
    { name: 'Aug', value: 4000 },
    { name: 'Sep', value: 3000 },
    { name: 'Oct', value: 2000 },
    { name: 'Nov', value: 2780 },
    { name: 'Dec', value: 1890 },
  ];

  const unrealizedPnlData = [
    { name: 'Mon', value: 100 },
    { name: 'Tue', value: 200 },
    { name: 'Wed', value: 150 },
    { name: 'Thu', value: 250 },
    { name: 'Fri', value: 180 },
  ];

  const realizedPnlData = [
    { name: 'Mon', value: 150 },
    { name: 'Tue', value: 250 },
    { name: 'Wed', value: 100 },
    { name: 'Thu', value: 300 },
    { name: 'Fri', value: 200 },
  ];

  const pieChartData = [
    { name: 'Wins', value: 70, color: '#00c16a' },
    { name: 'Losses', value: 30, color: '#ff4d4d' },
  ];

  return (
    <div className="portfolio-page">
      <style>{`
        .portfolio-page {
          display: flex;
          background-color: #0a0f1a;
          color: #d7e1ec;
          min-height: 100vh;
          padding: 20px;
          gap: 20px;
        }

        .portfolio-main-content {
          flex: 3;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .portfolio-sidebar {
          flex: 1;
          background-color: #1a1a1a;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .portfolio-header h1 {
          font-size: 2.5em;
          color: #4da6ff;
          margin-bottom: 20px;
        }

        .value-cards {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .card {
          background-color: #1a1a1a;
          padding: 20px;
          border-radius: 8px;
          flex: 1;
        }

        .card h2 {
          font-size: 1em;
          color: #a7b4c8;
          margin-bottom: 5px;
        }

        .card p {
          font-size: 2em;
          font-weight: bold;
          color: #ffffff;
        }

        .card span {
          color: #00c16a;
        }

        .portfolio-value-chart,
        .positions-table,
        .pnl-sections,
        .activity-section {
          background-color: #1a1a1a;
          padding: 20px;
          border-radius: 8px;
        }

        .portfolio-value-chart h2,
        .positions-table h2,
        .pnl-sections h2,
        .activity-section h2,
        .portfolio-sidebar h2,
        .performance-analytics h2 {
          font-size: 1.5em;
          color: #ffffff;
          margin-bottom: 15px;
        }

        .positions-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .positions-table th,
        .positions-table td {
          padding: 10px;
          border-bottom: 1px solid #333;
          text-align: left;
        }

        .positions-table th {
          color: #a7b4c8;
        }

        .positions-table td {
          color: #ffffff;
        }

        .pnl-sections {
          display: flex;
          gap: 20px;
        }

        .pnl-card {
          flex: 1;
          background-color: #1a1a1a;
          padding: 20px;
          border-radius: 8px;
        }

        .pnl-card p {
          font-size: 1.5em;
          font-weight: bold;
          color: #00c16a;
        }

        .activity-section ul {
          list-style: none;
          padding: 0;
        }

        .activity-section li {
          padding: 10px 0;
          border-bottom: 1px solid #333;
          color: #a7b4c8;
        }

        .activity-section li:last-child {
          border-bottom: none;
        }

        .filter-group label {
          display: block;
          margin-bottom: 5px;
          color: #a7b4c8;
        }

        .filter-group select,
        .portfolio-sidebar button {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #333;
          background-color: #0a0f1a;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .portfolio-sidebar button {
          background-color: #00c16a;
          cursor: pointer;
        }

        .performance-analytics p {
          color: #a7b4c8;
          margin-bottom: 5px;
        }

        .performance-analytics h3 {
          font-size: 1.8em;
          color: #00c16a;
        }
      `}</style>
      {/* Main content area */}
      <div className="portfolio-main-content">
        {/* Header and Value Cards */}
        <div className="portfolio-header">
          <h1>Portfolio</h1>
          <div className="value-cards">
            <div className="card">
              <h2>Total Portfolio Value</h2>
              <p>$12,450.37</p>
              <span>+ $412 Today</span>
            </div>
            <div className="card">
              <h2>Available Balance</h2>
              <p>$11,30.00</p>
              <span>+ $8 $.590</span>
            </div>
          </div>
        </div>

        {/* Portfolio Value Chart */}
        <div className="portfolio-value-chart">
          <h2>Portfolio Value</h2>
          {/* Placeholder for chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#a7b4c8" />
              <YAxis stroke="#a7b4c8" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4da6ff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Positions Table */}
        <div className="positions-table">
          <h2>Positions</h2>
          {/* Placeholder for table */}
          <div style={{ background: '#1a1a1a', padding: '20px' }}>
            <table>
              <thead>
                <tr>
                  <th>Outcome</th>
                  <th>Average</th>
                  <th>Current</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Will BTC close above 100 by 2028?</td>
                  <td>YES</td>
                  <td>$1.07</td>
                  <td>$1.307</td>
                </tr>
                <tr>
                  <td>Ordia Vleteotie ecete?</td>
                  <td>NO</td>
                  <td>$1.30</td>
                  <td>$1.32</td>
                </tr>
                <tr>
                  <td>How Vimt/rcish/tater</td>
                  <td>NO</td>
                  <td>$1.38</td>
                  <td>$1.30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* P&L Sections */}
        <div className="pnl-sections">
          <div className="pnl-card">
            <h2>Unrealized P&L</h2>
            <p>+$1,320.00</p>
            {/* Placeholder for bar chart */}
            <ResponsiveContainer width="100%" height={50}>
              <BarChart data={unrealizedPnlData}>
                <Bar dataKey="value" fill="#00c16a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="pnl-card">
            <h2>Realized P&L</h2>
            <p>+$2,640.70</p>
            {/* Placeholder for bar chart */}
            <ResponsiveContainer width="100%" height={50}>
              <BarChart data={realizedPnlData}>
                <Bar dataKey="value" fill="#00c16a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Section */}
        <div className="activity-section">
          <h2>Activity</h2>
          {/* Placeholder for activity list */}
          <ul style={{ background: '#1a1a1a', padding: '20px' }}>
            <li>Market entry - 10 26 AM Today</li>
            <li>Sell doctoring tordis - 23:58:80 May</li>
            <li>Pavout - 05-48:55 Apr</li>
          </ul>
        </div>
      </div>

      {/* Sidebar area */}
      <div className="portfolio-sidebar">
        <h2>Advanced Filters</h2>
        {/* Filter elements */}
        <div className="filter-group">
          <label>Market Type</label>
          <select><option>Politics</option></select>
        </div>
        <div className="filter-group">
          <label>Position Type</label>
          <select><option>Yes</option></select>
        </div>
        <div className="filter-group">
          <label>Sort by</label>
          <select><option>Value</option></select>
        </div>
        <div className="filter-group">
          <label>Date Entered</label>
          <select><option>Market End Date</option></select>
        </div>
        <div className="filter-group">
          <label>Status</label>
          <div>
            <button>Open</button>
            <button>Seffred</button>
            <button>High</button>
          </div>
        </div>
        <div className="filter-group">
          <label>Risk Level</label>
          <div>
            <button>Low</button>
            <button>Medium</button>
            <button>High</button>
          </div>
        </div>
        <button className="apply-button">Apply</button>

        {/* Performance Analytics */}
        <div className="performance-analytics">
          <h2>Performance Analytics</h2>
          <p>Longest Winning Trade</p>
          <h3>+$1,320.00</h3>
          {/* Placeholder for circular chart */}
          <ResponsiveContainer width="100%" height={100}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={40}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
