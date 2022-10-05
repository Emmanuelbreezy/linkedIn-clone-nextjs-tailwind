import Head from 'next/head';
import {getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
//import { signOut } from "next-auth/react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";


export default function Home() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });
  return (
    <div className="bg-[#F3F2EF] dark:bg-black/90 dark:text-white h-screen overflow-y-scrol md:space-y-6" >
      <Head>
      <title>Feed | LinkedIn</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <main  className="flex justify-center gap-x-5 px-4 sm:px-12">
       <div  className="flex flex-col md:flex-row  gap-5 ">
         {/* SideBar */}
            <SideBar />
         {/* Feed */}
       </div>

       {/* Widget */}
    </main>
  </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }


  return {
    props: {
      session,
    },
  };
}