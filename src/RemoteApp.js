import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import {ChunkManager} from '@callstack/repack/client';
import Remote from './remote';

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
              await ChunkManager.preloadChunk('remoteapp');
              setIsPreloaded(true);
            }}
          />

          <Button title="Load chunk" onPress={() => setIsLoaded(true)} />
        </>
      )}
      <Button
        title={'Invalidate'}
        onPress={async () => {
          await ChunkManager.invalidateChunks(['remoteapp']);
          setIsPreloaded(false);
        }}
      />
    </View>
  );
};
