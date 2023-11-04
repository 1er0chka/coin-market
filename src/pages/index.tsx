import styles from "./index.module.scss"
import Table from "@/app/components/table/Table"
import '../app/styles/globals.css'

export default function Home() {
    return (
        <main>
            <div className={styles.content}>
                <Table/>
            </div>
        </main>
    )
}
