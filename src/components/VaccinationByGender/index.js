import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vacByGender} = props
  return (
    <div className="dashboard-bg-container">
      <h1 className="db-title">Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={1000} height={300}>
          <Pie
            cx="50%"
            cy="50%"
            data={vacByGender}
            startAngle={180}
            endAngle={0}
            innerRadius="30%"
            outerRadius="60%"
            dataKey="count"
            label
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
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

export default VaccinationByGender
