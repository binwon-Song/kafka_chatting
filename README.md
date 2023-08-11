# kafka_chatting
CS(Computer Science) Lab 개인 프로젝트 Kafka로 채팅 서버 만들기 with node.js
- Apach Kafka와 KRaft를 사용해 채팅서버 구현
- Zookeeper는 deprecated되는 코디네이션 서비스이기에 KRaft사용
- topic 1 partition 1로 구성되는 간단한 Kafka 사용
- 채팅방 여러개를 관리하기 위해선 topic을 늘리거나 partition을 늘려 consumer가 consume할 때 key값 전달 필요

## OverView

채팅 전 사용자 인식 과정
<img width="1440" alt="스크린샷 2023-08-11 오후 10 07 45" src="https://github.com/binwon-Song/kafka_chatting/assets/90763389/edbf254e-3646-427f-b7fd-6acd062d8097">

채팅 화면  
<img width="500" alt="image" src="https://github.com/binwon-Song/kafka_chatting/assets/90763389/e35bf646-4c69-47c2-b098-cb776c4f9a54">
  

## How To Use
- Apache Kafka 설치 필요
- Kafka/bin ./kafka-storage.sh random-uuid
- Kafka/bin ./kafka-stroage.sh -t UUID -c ../config/kraft/server.properties
- Kafka/bin ./kafka-topics.sh –bootstrap-server localhost:9092 –create --topic chat-server –- partitions 1 replication-factor 1
- node index.js 실행
- 아이디와 이름을 localStroage로 저장하기 때문에 동일 브라우저에서는 작동안함. 시크릿 모드로 작동하거나 다른 브러우저에서 실행해야함.

## Reference
아파치 카프카 공식 사이트   https://kafka.apache.org/documentation/  
kafka.js 공식 사이트  https://kafka.js.org/docs/1.14.0/consuming
