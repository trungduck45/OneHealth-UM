FROM eclipse-temurin:17-jdk-alpine

ADD target/pmm-0.0.1-SNAPSHOT.jar pmm.jar
# get arg DB_PATH from docker build command
ARG DB_PATH=PMM.db
ARG SCRIPT_PATH=dbscript/

COPY $DB_PATH /opt/pos-management/PMM.db
COPY $DB_PATH /PMM.db
COPY $SCRIPT_PATH /opt/dbscript/

RUN chmod a+rw /opt/dbscript/
RUN apk add sqlite-dev

ENTRYPOINT exec java -XX:+UseG1GC -Xms256m -Xmx256m -jar pmm.jar