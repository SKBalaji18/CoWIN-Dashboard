import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vacByAge} = props

  return (
    <div className="dashboard-bg-container">
      <h1 className="db-title">Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={1000} height={300}>
          <Pie
            cx="50%"
            cy="50%"
            data={vacByAge}
            startAngle={0}
            endAngle={360}
            outerRadius="60%"
            dataKey="count"
            label
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
