import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import {ChunkManager} from '@callstack/repack/client';

const RemoteChunkId = 'remoteapp';
const Remote = React.lazy(() =>
  import(/* webpackChunkName: "remoteapp" */ '../remoteapp'),
);

export const RemoteApp = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(Remote);
  return (
    <View>
      {isLoaded ? (
        <View>
          <Text>Here should be a remote chunk</Text>
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <Remote />
          </React.Suspense>
        </View>
      ) : (
        <>
          <Button
            title={isPreloaded ? 'Preloaded' : 'Preload chunk'}
            disabled={isPreloaded}
            onPress={async () => {
              await ChunkManager.preloadChunk(RemoteChunkId);
              setIsPreloaded(true);
            }}
          />

          <Button title="Load chunk" onPress={() => setIsLoaded(true)} />
        </>
      )}
      <Button
        title={'Invalidate'}
        onPress={async () => {
          await ChunkManager.invalidateChunks([RemoteChunkId]);
          setIsPreloaded(false);
        }}
      />
    </View>
  );
};
