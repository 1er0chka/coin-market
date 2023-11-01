import styles from "./page.module.scss"
import Table from "@/app/components/table/Table";

export default function Home() {
    return (
        <main>
            <div>Today's Cryptocurrency Prices</div>
            <Table/>
        </main>
    )
}
