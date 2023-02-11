import Header from "./Header";
import styles from "./HomeScreen.module.css";
import { Box, Container, Typography } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';

const HospitalD = [
	"● Create new record for patient",
	"● Access past medical records",
	"● Check all Patients profile",
];
const UserD = [
	"● Find the closest hospitals",
	"● Give data access to Orgs ",
	"● Access past medical records",
];
const OrgD = ["● Create new Researches", "● Access patient data"];

const HomeScreen = () => {
	const Footer = () => {
		return (
			<>
				<Box
					component="footer"
					sx={{
						py: 3,
						px: 2,
						mt: "auto",
						display: "flex",
						flexDirection: "column",
						backgroundColor: (theme) =>
							theme.palette.mode === "light"
								? theme.palette.grey[200]
								: theme.palette.grey[800],
					}}
				>
					<Container maxWidth="sm">
						<Typography variant="body">
							DecentraSupply 2023 &#169; - All Rights Reserved.
						</Typography>
					</Container>
				</Box>
			</>
		);
	};

	const CustomButton = ({ text, color = "#753bd9" }) => {
		return (
			<button
				className={styles.btn}
				style={{ backgroundColor: `${color}` }}
			>
				{text}
			</button>
		);
	};

	const FeatureCard = ({ name, text, icon, url = "#" }) => {
		return (
			<div className={`${styles.feature_card}`}>
				<div className={styles.icon}>{icon}</div>
				<h3>{name}</h3>
				{text.map(function (name, index) {
					return <p key={index}>{name}</p>;
				})}
				<a href={url}>see more..</a>
			</div>
		);
	};

	return (
		<>
			<Header />

			<section className={`${styles.container} ${styles.hero}`}>
				<h1>Enhancing the Supply Chain Ecosystem</h1>
				<p>
					<strong style={{ color: "#753bd9", fontSize: "20px" }}>
						DecentraSupply's
					</strong>{" "}
					goal is to leverage blockchain technology to
					create a more secure, efficient, and transparent supply chain system. The solution should
					allow for real-time tracking of products, verifiable information about the origin and quality
					of products, and secure, tamper-proof records of transactions.
				</p>
				<CustomButton text="get started now" />
			</section>

			<section className={styles.features}>
				<div className={`${styles.container}`}>
					<button
						style={{
							backgroundColor: "#753bd9",
							padding: "7px 15px",
						}}
					>
						Key Features
					</button>
					<h3>what is DecentraSupply ?</h3>
					<p>
						Our application provides a central repository of Lorem ipsum dolor sit amet 
						consectetur adipisicing elit. Laudantium accusantium rerum asperiores 
						consequuntur voluptate odio quae? Libero excepturi, facilis is distinctio 
						vel voluptatum, perferendis iste eius fugit nostrum autem repellat dignissimos! distinctio 
						vel voluptatum, perferendis iste eius fugit nostrum autem repellat dignissimos!
					</p>
					<div className={`${styles.row} ${styles.features__flex}`}>
						<FeatureCard
							icon={
								<BusinessIcon
									sx={{ color: "#753bd9", fontSize: "80px" }}
								/>
							}
							name="Manufacturer"
							text={HospitalD}
							url="/registerCompany"
						/>
						<FeatureCard
							icon={
								<FaceIcon
									sx={{ color: "#753bd9", fontSize: "80px" }}
								/>
							}
							name="Seller"
							text={UserD}
							url="/registerSeller"
						/>
						<FeatureCard
							icon={
								<PersonIcon
									sx={{ color: "#753bd9", fontSize: "80px" }}
								/>
							}
							name="Buyer"
							text={OrgD}
							url="/register"
						/>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
};

export default HomeScreen;
