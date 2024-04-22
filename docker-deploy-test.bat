set dbPath="databases/BND_BIDV_PMM.db"
set Version="20220125-BND-BIDV"
call git pull
call mvnw -ntp -Ptest clean verify -DskipTests
call docker build --pull --rm -f "Dockerfile" -t crelease.devops.vnpt.vn:10149/bvtm/pmm:%Version% --build-arg DB_PATH=%dbPath% "."
call docker push crelease.devops.vnpt.vn:10149/bvtm/pmm:%Version%