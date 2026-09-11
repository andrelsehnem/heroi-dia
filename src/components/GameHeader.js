import { Text, View } from "react-native";
import styles from "../styles/game-header.styles";

export default function GameHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.kicker}>QUEM SALVARÁ O MUNDO HOJE?</Text>
        <Text style={styles.title}>HERÓI DO DIA</Text>
      </View>
      <View style={styles.stamp}>
        <Text style={styles.stampText}>CASO{"\n"}ATIVO</Text>
      </View>
    </View>
  );
}
