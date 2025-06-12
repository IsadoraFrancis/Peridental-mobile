import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import api from "@/services/api";
import { Header } from "@/components/Header";

type Caso = {
  data_do_caso: string;
  tipo_do_caso: string;
  localizacao: string;
  vitima: {
    idade: number;
    etnia: string;
  };
};

// Dados mockados
const dadosMockados: Caso[] = [
  {
    data_do_caso: "2024-01-15",
    tipo_do_caso: "Furto",
    localizacao: "Centro",
    vitima: { idade: 25, etnia: "Branca" },
  },
  {
    data_do_caso: "2024-01-20",
    tipo_do_caso: "Assalto",
    localizacao: "Bairro A",
    vitima: { idade: 30, etnia: "Parda" },
  },
  {
    data_do_caso: "2024-02-01",
    tipo_do_caso: "Violência doméstica",
    localizacao: "Bairro B",
    vitima: { idade: 35, etnia: "Negra" },
  },
  {
    data_do_caso: "2024-02-10",
    tipo_do_caso: "Tráfico",
    localizacao: "Zona Rural",
    vitima: { idade: 28, etnia: "Indígena" },
  },
  {
    data_do_caso: "2024-02-15",
    tipo_do_caso: "Furto",
    localizacao: "Centro",
    vitima: { idade: 22, etnia: "Amarela" },
  },
  {
    data_do_caso: "2024-02-20",
    tipo_do_caso: "Assalto",
    localizacao: "Bairro A",
    vitima: { idade: 40, etnia: "Branca" },
  },
  {
    data_do_caso: "2024-03-01",
    tipo_do_caso: "Violência doméstica",
    localizacao: "Bairro B",
    vitima: { idade: 32, etnia: "Parda" },
  },
  {
    data_do_caso: "2024-03-10",
    tipo_do_caso: "Tráfico",
    localizacao: "Zona Rural",
    vitima: { idade: 45, etnia: "Negra" },
  },
  {
    data_do_caso: "2024-03-15",
    tipo_do_caso: "Furto",
    localizacao: "Centro",
    vitima: { idade: 27, etnia: "Indígena" },
  },
  {
    data_do_caso: "2024-03-20",
    tipo_do_caso: "Assalto",
    localizacao: "Bairro A",
    vitima: { idade: 33, etnia: "Amarela" },
  },
];

const screenWidth = Dimensions.get("window").width;

const gradiente = [
  "#40516c",
  "#4a5d7c",
  "#53698c",
  "#5d759c",
  "#6b82a7",
  "#7790b1",
  "#8b9dba",
];

export const Dashboard: React.FC = () => {
  const [dadosCasos, setDadosCasos] = useState<Caso[]>([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulando carregamento com dados mockados
    setTimeout(() => {
      setDadosCasos(dadosMockados);
      setLoading(false);
    }, 1000);
  }, []);

  const filtrarPorData = (casos: Caso[]) => {
    return casos.filter((caso) => {
      const data = new Date(caso.data_do_caso);
      const inicio = dataInicio ? new Date(dataInicio) : null;
      const fim = dataFim ? new Date(dataFim) : null;
      return (!inicio || data >= inicio) && (!fim || data <= fim);
    });
  };

  const contarOcorrencias = (dados: Caso[], chave: string) => {
    const contagem: Record<string, number> = {};
    dados.forEach((caso) => {
      const valor = chave.includes(".")
        ? chave.split(".").reduce((o, k) => o?.[k], caso as any)
        : (caso as any)[chave];
      if (valor) contagem[valor] = (contagem[valor] || 0) + 1;
    });
    return contagem;
  };

  const renderGraficoRosca = (dados: Caso[]) => {
    const contagem = contarOcorrencias(dados, "tipo_do_caso");
    return Object.keys(contagem).map((key, index) => ({
      name: key,
      population: contagem[key],
      color: gradiente[index % gradiente.length],
      legendFontColor: "#333",
      legendFontSize: 12,
    }));
  };

  const renderGraficoDistribuicao = (dados: Caso[]) => {
    const idades = dados
      .map((c) => c.vitima?.idade)
      .filter((i) => i && i > 0) as number[];
    const bins = new Array(10).fill(0);
    const labels = bins.map((_, i) => `${i * 10 + 1}-${(i + 1) * 10}`);

    idades.forEach((i) => {
      const idx = Math.floor((i - 1) / 10);
      if (idx >= 0 && idx < bins.length) bins[idx]++;
    });

    return { labels, data: bins };
  };

  const renderGraficoEtnia = (dados: Caso[]) => {
    const contagem = contarOcorrencias(dados, "vitima.etnia");
    return {
      labels: Object.keys(contagem),
      data: Object.values(contagem),
    };
  };

  const renderGraficoEvolucao = (dados: Caso[]) => {
    const contagem: Record<string, number> = {};
    dados.forEach(({ data_do_caso }) => {
      const d = new Date(data_do_caso);
      const chave = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      contagem[chave] = (contagem[chave] || 0) + 1;
    });
    const labels = Object.keys(contagem).sort();
    const valores = labels.map((k) => contagem[k]);

    return { labels, data: valores };
  };

  const filtrados = filtrarPorData(dadosCasos);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(64, 81, 108, ${opacity})`,
    barPercentage: 0.5,
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#40516c" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => setError(null)}
          >
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titulo}>📊 Painel de Casos</Text>

        <View style={styles.filtroContainer}>
          <TextInput
            placeholder="Data Início (AAAA-MM-DD)"
            style={styles.input}
            value={dataInicio}
            onChangeText={setDataInicio}
          />
          <TextInput
            placeholder="Data Fim (AAAA-MM-DD)"
            style={styles.input}
            value={dataFim}
            onChangeText={setDataFim}
          />
        </View>

        <Text style={styles.subtitulo}>Tipos de Casos</Text>
        <PieChart
          data={renderGraficoRosca(filtrados)}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />

        <Text style={styles.subtitulo}>Distribuição por Idade</Text>
        <BarChart
          data={{
            labels: renderGraficoDistribuicao(filtrados).labels,
            datasets: [{ data: renderGraficoDistribuicao(filtrados).data }],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
        />

        <Text style={styles.subtitulo}>Por Etnia</Text>
        <BarChart
          data={{
            labels: renderGraficoEtnia(filtrados).labels,
            datasets: [{ data: renderGraficoEtnia(filtrados).data }],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          fromZero
        />

        <Text style={styles.subtitulo}>Evolução por Mês</Text>
        <LineChart
          data={{
            labels: renderGraficoEvolucao(filtrados).labels,
            datasets: [{ data: renderGraficoEvolucao(filtrados).data }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          fromZero
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollView: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: "#333",
  },
  filtroContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#40516c",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#dc2626",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#40516c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
