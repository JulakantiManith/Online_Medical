import React from 'react';
import './doctordash.css'; // Styles for DoctorDash
import DoctorNavbar from './Doctornavbar'; 

const DoctorDash = () => {
    const recentActivities = [
        'Reviewed John Doe’s medical reports.',
        'Completed a video call with Jane Smith.',
        'Prescribed medication for Michael Johnson.',
    ];

    const upcomingAppointments = [
        { patient: 'Alice Brown', time: '9:00 AM', status: 'Pending' },
        { patient: 'Bob White', time: '10:30 AM', status: 'Confirmed' },
        { patient: 'Claire Adams', time: '2:00 PM', status: 'Pending' },
    ];

    const quickStats = {
        totalPatients: 120,
        activeCalls: 2,
        pendingAppointments: 3,
    };

    return (
        <div className="doctor-dash-container">
            <DoctorNavbar />
            <div className="doctor-dash-welcome-message">
                <h1>Welcome to Your Doctor Dashboard</h1>
                <p>Here’s a quick overview of your current status and activities.</p>
                <input type="text" placeholder="Search patients or appointments..." className="search-bar" />
            </div>

            <div className="doctor-dash-dashboard-stats">
                <div className="doctor-dash-quick-stats">
                    <h2>Quick Stats</h2>
                    <div className="stats-cards">
                        <div className="stat-card">
                            <h3>Total Patients</h3>
                            <p>{quickStats.totalPatients}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Active Calls</h3>
                            <p>{quickStats.activeCalls}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Pending Appointments</h3>
                            <p>{quickStats.pendingAppointments}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="doctor-dash-recent-activities">
                <h2>Recent Activities</h2>
                <ul>
                    {recentActivities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))}
                </ul>
            </div>

            <div className="doctor-dash-appointments">
                <h2>Upcoming Appointments</h2>
                <div className="appointments-list">
                    {upcomingAppointments.map((appointment, index) => (
                        <div key={index} className={`appointment-card ${appointment.status.toLowerCase()}`}>
                            <p><strong>Patient:</strong> {appointment.patient}</p>
                            <p><strong>Time:</strong> {appointment.time}</p>
                            <p><strong>Status:</strong> {appointment.status}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="doctor-dash-notifications">
                <h2>Notifications</h2>
                <ul>
                    <li>New message from Alice Brown regarding her prescription.</li>
                    <li>Reminder: Follow-up with Bob White in 2 days.</li>
                    <li>New appointment request from Claire Adams.</li>
                </ul>
            </div>
        </div>
    );
};

export default DoctorDash;
