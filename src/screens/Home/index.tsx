import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleAddParticipant() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participante existente",
        "Ja existe um participante com este nome"
      );
    }
    setParticipants((state) => [...state, participantName]);
    setParticipantName("");
  }

  function handleRemoveParticipant(participantName: string) {
    Alert.alert("Remover", `Deseja remover participante ${participantName}`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((state) =>
            state.filter((participant) => participant !== participantName)
          ),
      },
      {
        text: "Nao",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de novembro de 2022</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleRemoveParticipant(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>
            Ninguem chegou no evento ainda? Adicione participantes a sua lista
          </Text>
        )}
      />
    </View>
  );
}
