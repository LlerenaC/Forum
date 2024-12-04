import { useState, useEffect} from "react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArrowUpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {  signOut, getAuth } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("xs")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
        },
    },
    
}));



interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    const navigate = useNavigate();

const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: active === link.link,
            })}
            onClick={(event) => {
                setActive(link.link);
            }}
        >
            {link.label}
        </Link>
    ));

    const [photoURL, setPhotoURL] = useState<null | string>();
    const auth = getAuth();
    const user = auth.currentUser;
    useEffect(() => {     
        if (user !== null) {
            user.providerData.forEach((profile) => {
            setPhotoURL(profile.photoURL);
            });
            
        }
    }, []);

    return (
        <div style={{width: "100vw", position:"sticky", zIndex:"100", top: "0px", borderBottom: "solid grey 2px",}}>
            <Header height={60}>
                <Container className={classes.header}>
                    <ArrowUpCircle size={28} />
                    <Group spacing={20} className={classes.links}>
                        {items}
                    </Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        className={classes.burger}
                        size='sm'
                    />
                    <button onClick={handleLogout} style={{position: "absolute", left: "90vw", backgroundColor:"lightslategray", color: "white"}}>
                        Logout
                    </button>
                    {(photoURL != null) &&
                        <img src={photoURL} style={{borderRadius: "50%", height: "30px", left: "87vw", position: "absolute"}}/>
                    } 
                </Container>
            </Header>
        </div>
    );
}
